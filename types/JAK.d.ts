export {};

declare global {
  interface JAKType {
    gel: (selector: HTMLElement | string) => HTMLElement;
  }
}
