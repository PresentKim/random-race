export default class RandomMap<K, V> extends Map<K, V> {
    random(): V {
        const values = Array.from(this.values());
        return values[Math.floor(values.length * Math.random() << 0)];
    }
}