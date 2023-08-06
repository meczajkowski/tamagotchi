
# Tamagotchi 👾

Manage your Tamagotchi's vital stats using action buttons. Keep an eye on its hunger and energy levels, ensuring they never dip below 6 to maintain optimal health.

Click an action button once to initiate an activity. Easily switch between actions by clicking on a different one, or effortlessly halt the current action by clicking it again.

Neglecting your Tamagotchi's needs could lead to a decline in health, and when health hits 0, the game is over. The Restart button will appear, allowing you a fresh start.



This is a Nerdboard.io practice project. More information in video below:

[![Watch the video](https://img.youtube.com/vi/ktoU-K6VN2U/hqdefault.jpg)](https://www.youtube.com/embed/ktoU-K6VN2U)





## Demo
See the project live here:
https://meczajkowski.github.io/tamagotchi/


## Features

- should handle 8 states `(happy, sleepy, sleeping,hungry, eating, playing, sad, dead)`
- should maintain 4 parameters `(health, hunger, energy, fun)`
- should support 3 actions `(feeding, sleeping, playing)`
- should support dying
- should restarting game be available


## How it should work

- energy should decrease by 1 point per 2 seconds,
- hunger should decrease by 1 points per second,
- fun should decrease by 1 point per second,
- health should decrease by 1 point per second when hunger or energy is below or equal to 0,
- energy should decrease by additional 1 point per 2 seconds when fun is below or equal to 0,
- action should last until other action is pressed or this one is finished by clicking on action button again


## Tech Stack

- HTML, 
- CSS, 
- TypeScript OOP, 
- Vite




## Screenshot

![App Screenshot](https://github.com/meczajkowski/tamagotchi/assets/110562040/7f5be5ad-a198-4235-b4e1-17872a5010c0)


## Run Locally

Clone the project

```bash
  git clone https://github.com/meczajkowski/tamagotchi.git
```

Go to the project directory

```bash
  cd tamagotchi
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Authors

- [@meczajkowski](https://www.github.com/octokatherine)


## Feedback

If you have any feedback, please reach out to me at:
-  michal.erik.czajkowski@gmail.com,
- https://www.linkedin.com/in/michalerikczajkowski/

