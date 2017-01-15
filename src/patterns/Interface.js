export default class Interface {
  constructor(...args) {
    if (args.length !== 2) {
      throw new Error(`Interface constructor called with ${arguments.length} arguments, but expected exactly 2.`);
    }
    this.name = args[0];
    this.methods = [];
    const methods = args[1];
    if (typeof methods === 'string') {
        this.methods.push(methods);
    } else if (Object.prototype.toString.call(methods) === '[object Array]') {
        for (let method of methods) {
          if (typeof method !== 'string') {
            throw new Error('Interface constructor expects method names to be passed in as a string');
          }
          this.methods.push(method);
        }

    } else {
      throw new Error('Interface constructor expects second argument to be passed in as a string or array');
    }
  }
  static ensureImplements(...args) {
    if(args.length < 2) {
      throw new Error(`function Interface.ensureImplements called with ${arguments.length} arguments, but expected at lease 2.`);
    }
    const obj = args[0];
    const others = args.slice(1);
    for (let inter of others) {
      if (inter.constructor !== Interface) {
        throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface');
      }
      for (let method of inter.methods) {
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error(`Function Interface.ensureImplements: object does not implement the ${inter.name} interface, Method ${method} was not found`);
          break;
        }
      }
    }

  }
}
