export const debounce = (func:(value:string)=>void, wait:number) => {
    let timerId: NodeJS.Timeout;
    return (value:string) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(value);
      }, wait);
    };
  };