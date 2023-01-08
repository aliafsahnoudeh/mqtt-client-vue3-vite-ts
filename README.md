# How to run the project

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