## Step 1: Start the Metro Server
First we need to save the endpoint url that we have to use the backend in my case im using ngrok if you have another one please use it and replace in file:

```bash
rtk-base-query.ts in line 9
```

```bash
baseUrl: 'your https here',
```

## Step 2: Start the Metro Server

You will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```


## Made by
Tomas Ruffa


