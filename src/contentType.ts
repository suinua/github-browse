export class ContentType {
    constructor(private value: string) {
    }

    equals(other:ContentType):boolean {
        return other.value === this.value;
    }


    static File(): ContentType {
        return new ContentType('File');
    }

    isFile():boolean {
        return this.equals(ContentType.File());
    }

    static Directory(): ContentType {
        return new ContentType('Directory');
    }

    isDirectory():boolean {
        return this.equals(ContentType.Directory());
    }


    static fromString(value:string): ContentType {
        console.assert([ContentType.File().value,ContentType.Directory().value].includes(value));
        return new ContentType(value);
    }
}