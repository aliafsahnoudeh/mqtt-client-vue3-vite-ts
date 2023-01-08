## The stage of the codebase
The codebase is far from a production-ready application. There are lots of topics that need to be covered. From stability, clean code, unit tests and etc.

## Architecture
I've used a three-layered architecture for this application, something similar to MVVM or MVP. I tried to separate the presentation layer from logic/business and also model/state.
<br />
By keeping as less logic as possible in ui components and the wrap the logic inside composable.
<br />
The logic behind mqtt client is encapsulated inside MqttService.ts and was injected as a singleton to the application.
<br />
Also, I tried to prevent overusing the global state management by keeping fewer data on it and also no logic inside.

### Installing the packages
```
yarn
```

### Run the app in dev mode
```
yarn dev
```

### Buidling the app
```
yarn build
```

### Running unit tests
```
yarn test:unit
```

### Running the containerized app
```
docker build -t mqtt-client-vue3-vite-ts .
```

```
docker run -dp 5000:80 mqtt-client-vue3-vite-ts
```