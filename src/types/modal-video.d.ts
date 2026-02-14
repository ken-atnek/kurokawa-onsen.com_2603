declare module 'modal-video' {
  export type ModalVideoOptions = Record<string, unknown>;

  export default class ModalVideo {
    constructor(selector: string, options?: ModalVideoOptions);
  }
}
