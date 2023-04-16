class BloomFilter {
    bitLength;
    bitArray;

    start ({bitWidth = 500}) {
        this.bitLength = bitWidth;
        this.bitArray = new Array(this.bitLength).fill(0);
    }

    hashOne (x) {
        return ((2 * x) % this.bitLength);
    }

    hashTwo (x) {
        return (((2 * x) + 2) % this.bitLength);
    }

    hashThree (x) {
        return (((2 * x) + 3) % this.bitLength);
    }

    add(val) {
        const [index1, index2] = this.getIndex(val);
        this.bitArray[index1] = 1;
        this.bitArray[index2] = 1;
    }

    has(val) {
        const [index1, index2] = this.getIndex(val);
        if (this.bitArray[index1] == 1 && this.bitArray[index2] == 1) {
            return true;
        }
        return false;
    }
      
    stringToAscii(str) {
        return str.charCodeAt();
      }

      getHashes(value) {
        const index1 = this.hashOne(value);
        const index2 = this.hashTwo(value);
        return [index1, index2];
      }

      getIndex(val) {
        const asciCode = this.stringToAscii(val);
        const [index1, index2] = this.getHashes(asciCode);
        return [index1, index2];
      }

}
module.exports = BloomFilter;