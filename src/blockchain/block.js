import { SHA256 } from 'crypto-js';

const DIFICULTAD = 3;

class Block{
    constructor(timestamp, previousHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }


    static get genesis(){
        const timestamp = ( new Date(2000,0,1)).getTime();
        return new this(timestamp, undefined, 'g3n3sis-h4sh', 'g3n3sis-d4t4')
    }

    static mine(previousBlock, data){
        const { hash: previousHash} = previousBlock;
        let timestamp;
        let hash;
        let nonce = 0;

        do{
            timestamp = Date.now();
            hash = Block.hash(timestamp, previousHash, data);
        } while (hash.substring(0, DIFICULTAD) !== '0'.repeat(DIFICULTAD));

        return new this(timestamp, previousHash, hash, data, nonce);
    }

    static hash(timestamp, previousHash, data){
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
    }

    toString(){
        const {
            timestamp, previousHash, hash, data, nonce,
        } = this;

        return `Block -
            timestamp       :${timestamp}
            previousHash    :${previousHash}
            hash            :${hash}
            data            :${data}
            nonce           :${data}
            `;
    }
}

export default Block;