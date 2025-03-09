import Sobird from './Sobird';

const App = (props) => {
  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {new Array(5).fill(0).map((item, index) => {
          return (
            <li>
              item,
              {index}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

console.log('App', App);

const ddd = <h1>dddd</h1>;

console.log('ddd', ddd);

console.log('Sobird', Sobird);
