from tempfile import mkstemp
from shutil import move
from os import fdopen, remove
from datetime import datetime

def replace(file_path, prefix, postfix):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path) as old_file:
            for line in old_file:
                if line.startswith(prefix):
                    new_file.write(prefix + postfix + "\n")
                else:
                    new_file.write(line)
    #Remove original file
    remove(file_path)
    #Move new file
    move(abs_path, file_path)

config = "_config.yml"
now = datetime.now()
if now.hour < 6 or now.hour >= 18:
    replace(config, "skin:", " dark")
else:
    replace(config, "skin:", " light")