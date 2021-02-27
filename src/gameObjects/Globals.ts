export let GLOBALS = {
  ITEM: {
    MATERIALS_VALUE: () => Math.floor(Math.random() * 12 + 1),
  },
  WAREHOUSE: {
    SPACE: {
      MAX: 200,
      MIN: 0,
    },
  },
  PLAYER: {
    TOOLING: {
      CAPACITY: {
        MAX: 5,
        MIN: 0,
      },
    },
  },
  START: {
    WAREHOUSE: {
      ENERGY: 200,
      IRON: 12,
      get SPACE(): any {
        delete this.SPACE;
        this.SPACE = this.ENERGY - this.IRON;
        return this.SPACE;
      },
      set SPACE(x) {
        this.SPACE = x;
      },
    },
  },
};
