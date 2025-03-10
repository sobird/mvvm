import Myact from './Myact';

function Counter() {
  const [state, setState] = Myact.useState(1);
  const handleClick = () => {
    setTimeout(() => {
      console.log('state', state);
      // setState(state + 1); // 这里的 count 始终是初始值 0
    }, 1000);
  };
  return (
    <div>
      <h1 onClick={() => { return setState((c) => { return c + 1; }); }}>
        Count:
        {' '}
        {state}
      </h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

const element = <Counter />;

const container = document.getElementById('root');
Myact.render(element, container);
