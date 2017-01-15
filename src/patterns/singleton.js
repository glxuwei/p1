const s1 = (() => {
  let name = 'zs';
  return {
    getName(cb) {
      cb && cb(name);
      return this;
    },
    setName(n) {
      name = n;
      return this;
    }
  }
})();

const slazy = (() => {
  let unique = null;
  const construct = () => {
    let age = 12;

    return {
      getAge(cb) {
        cb && cb(age);
        return this;
      },
      setAge(a) {
        age = a;
        return this;
      },
    }
  }

  return {
    getInstance(...args) {
      if (!unique) {
        unique = construct(...args);
      }
      return unique;
    }
  }

})();

export default (() => {

  const standard = {
    createXhrObject() {
      return new XMLHttpRequest();
    }
  };
  const activeXNew = {
    createXhrObject() {
      return new ActiveXObject('Msxml2.XMLHTTP');
    }
  };
  const activeXOld = {
    createXhrObject() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  };

  try {
    standard.createXhrObject();
    return standard;
  } catch(e) {
    try {
      activeXNew.createXhrObject();
      return activeXNew;
    } catch(e) {
      try {
        activeXOld.createXhrObject();
        return activeXOld;
      } catch(e) {
        throw new Error('No XHR object found in this environment');
      }
    }
  }
})();

export {s1, slazy};
