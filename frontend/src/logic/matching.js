// ===== DATA MATCHING LOGIC =====
// Handles matching between faculty data and master SDM data

import { APP_DATA } from '../data/store.js';
import { normalizeName, getSimilarity } from '../utils/helpers.js';

// Manual overrides for specific edge cases
const MANUAL_OVERRIDES = {
    'angga intueri mahendra p., s.sos, m.i.kom': '191',
    'laksmindra saptyawati, se, mba': '188',
    'nurhayanto, s.e., m.b.a.': '382',
    'arief setyanto, dr.,s.si, mt': '16',
    'fauzia anis sekar ningrum, s.t., m.t.': '458',
    'nimah mahnunah, s.t., m.t': '224'
};

const SIMILARITY_THRESHOLD = 0.65;

/**
 * Main matching function - matches faculty data with SDM master data
 * Priority: Manual Override > NIK Match > Exact Name > Fuzzy Name
 */
export function processMatching() {
    console.log('Memulai proses pencocokan data...');
    const sdmData = APP_DATA.masterDosen;
    if (!sdmData || sdmData.length === 0) return;

    ['FIK', 'FES', 'FST'].forEach(fakultas => {
        const facultyRows = APP_DATA.facultyData[fakultas];
        if (!facultyRows) return;

        facultyRows.forEach(dosen => {
            const matchResult = findBestMatch(dosen, sdmData);

            // Save match result
            dosen.matchResult = matchResult;

            // Update dosen data if matched
            if (matchResult.matched && matchResult.sdm) {
                if (!dosen.originalNama) dosen.originalNama = dosen.nama;
                if (!dosen.originalNik) dosen.originalNik = dosen.nik;
                dosen.nama = matchResult.sdm.nama;
                dosen.nik = matchResult.sdm.nik;
            }
        });
    });

    console.log('Pencocokan dan standardisasi selesai.');
}

/**
 * Find best match for a single dosen
 */
function findBestMatch(dosen, sdmData) {
    let bestMatch = null;
    let matchType = 'none';
    let score = 0;

    const rawNameLower = dosen.nama ? dosen.nama.toLowerCase().trim() : '';
    const normName = normalizeName(dosen.nama);

    // 1. Check Manual Override (Highest Priority)
    if (MANUAL_OVERRIDES[rawNameLower]) {
        const targetNo = MANUAL_OVERRIDES[rawNameLower];
        const manualMatch = sdmData.find(s => s.no == targetNo);
        if (manualMatch) {
            return {
                matched: true,
                type: 'manual',
                score: 100,
                sdm: manualMatch
            };
        }
    }

    // 2. Check NIK Match
    const cleanNik = dosen.nik ? dosen.nik.replace(/\D/g, '') : '';
    if (cleanNik && cleanNik !== '0' && cleanNik.length > 3) {
        const nikMatch = sdmData.find(s => s.nik && s.nik.replace(/\D/g, '') === cleanNik);
        if (nikMatch) {
            return {
                matched: true,
                type: 'nik',
                score: 100,
                sdm: nikMatch
            };
        }
    }

    // 3. Check Name Match (Exact & Fuzzy)
    let bestNameScore = 0;
    let bestNameMatch = null;

    sdmData.forEach(sdm => {
        const normSdm = normalizeName(sdm.nama);

        if (normName === normSdm) {
            // Exact match after normalization
            if (bestNameScore < 100) {
                bestNameScore = 100;
                bestNameMatch = sdm;
            }
        } else {
            // Fuzzy match
            const sim = getSimilarity(normName, normSdm);
            if (sim > bestNameScore) {
                bestNameScore = sim;
                bestNameMatch = sdm;
            }
        }
    });

    // Apply threshold
    if (bestNameScore >= SIMILARITY_THRESHOLD) {
        bestMatch = bestNameMatch;
        score = Math.round(bestNameScore * 100);
        matchType = score === 100 ? 'name_exact' : 'name_fuzzy';
    }

    return {
        matched: !!bestMatch,
        type: matchType,
        score: score,
        sdm: bestMatch
    };
}
