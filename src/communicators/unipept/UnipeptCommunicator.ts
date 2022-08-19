// Should probably be stored in some kind of env
const base = "http://api.unipept.ugent.be/api/v1/";

export default class UnipeptCommunicator {
    public async pept2prot(input: string[], equate_il = false, extra = false): Promise<string[]> {
        const params = new URLSearchParams({
            equate_il: equate_il.toString(),
            extra: extra.toString()
        });

        for(const inp of input) {
            params.append("input[]", inp);
        }

        return await fetch(this.prepareURL(base, "pept2prot.json", params)).then(r => r.json());
    }

    private prepareURL(base: string, extra: string, parameters: URLSearchParams): string {
        return base + extra + "?" + parameters;
    }
}
