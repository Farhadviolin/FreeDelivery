import json, glob, sys

def qa_namespace(ns):
    base = json.load(open(f'locales/de/{ns}.json'))
    for lng in ['en','fr','es']:
        trans = json.load(open(f'locales/{lng}/{ns}.json'))
        missing = set(base) - set(trans)
        if missing:
            print(f"[ERROR] {len(missing)} missing keys in {lng}/{ns}: {missing}")
            sys.exit(1)

if __name__ == "__main__":
    for ns_file in glob.glob('locales/de/*.json'):
        ns = ns_file.split('/')[-1].replace('.json','')
        qa_namespace(ns)
