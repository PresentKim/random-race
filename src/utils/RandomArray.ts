export default class RandomArray<V> extends Array<V> {
    random(): V | null {
        return this[Math.floor(this.length * Math.random() << 0)] ?? null;
    }

    randomPop(): V | null {
        const index = Math.floor(this.length * Math.random() << 0);
        const result = this[index] ?? null;
        if (result !== null) {
            this.splice(index, 1);
        }

        return result;
    }
}