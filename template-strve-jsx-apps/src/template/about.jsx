import { defineComponent } from 'strve-js';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    function getOption() {
      console.log(toParse());
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
      </fragment>
    );
  });

export default about;
