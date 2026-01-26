
path = r"p:\Project Aplikasi\Jadwal Pendadaran\src\main.js"
try:
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Lines handling (0-based index)
    # Line 1-16 (index 0-15) -> Header
    # Line 17 (index 16) -> slots: [
    # ... data ...
    # Line 68 (index 67) -> };

    # We keep 0-15
    new_lines = lines[:16]
    
    # Insert empty slots
    new_lines.append("    slots: []\n")
    new_lines.append("};\n")
    
    # We resume from line 69 (index 68), effectively skipping lines 16-67
    # Check if lines definition matches our assumption
    if "slots: [" in lines[16] and "};" in lines[67]:
        new_lines.extend(lines[68:])
        
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Success cleaning data")
    else:
        print("Mismatch line numbers, aborting to avoid corruption")
        print(f"Line 16: {lines[16]}")
        print(f"Line 67: {lines[67]}")

except Exception as e:
    print(f"Error: {e}")
