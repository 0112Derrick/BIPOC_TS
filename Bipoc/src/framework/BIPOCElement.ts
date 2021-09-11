import { CommonDataInterface } from "../member/MemberData";
import ClientSyntheticEventEmitter from './ClientSyntheticEventEmitter.js'

export abstract class Reader<T extends CommonDataInterface> {
  abstract read(): Promise<T>;
}

export abstract class Writer<T extends CommonDataInterface> {
  abstract write(data: T): Promise<null>;
}

/** Common BIPOC interface */
export default abstract class BIPOCElement<T extends CommonDataInterface> extends ClientSyntheticEventEmitter {

  protected writer: (Writer<T> | null);
  protected reader: (Reader<T> | null);

  constructor() {
    super()
    this.reader = null;
    this.writer = null;
  }

  injectReader(reader: Reader<T>) {
    this.reader = reader;
  }
  injectWriter(writer: Writer<T>) {
    this.writer = writer;
  }

  abstract getData(): T;
  abstract setData(memberData: T): void;


}
