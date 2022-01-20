/** @jsx h */
import {
  Component,
  h,
  Store,
} from "https://deno.land/x/nano_jsx@v0.0.28/mod.ts";

const myStore = new Store({ count: 0 });

export class MyComponent extends Component {
  // use the myStore inside MyComponent
  store = myStore.use();

  didMount() {
    // subscribe to store changes
    this.store.subscribe((newState: any, prevState: any) => {
      console.log({ newState, prevState });
      // check if you need to update your component or not
      if (newState.name !== prevState.name) this.update();
    });
  }

  didUnmount() {
    // cancel the store subscription
    this.store.cancel();
  }

  render() {
    return <p>{this.store.state.count}</p>; // <p>100</p>
  }
}

export function Participant(props: { name: string }) {
  return (
    <div>
      {props.name}
    </div>
  );
}
