export const stringFunc = {
  compareOneWithMany(target: string, strings: string[]) {
    let match = false;
    strings.map((string) => {
      if (!match && target === string) {
        match = true;
      }
    });
    return match;
  },
};
