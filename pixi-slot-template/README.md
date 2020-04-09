#pixi-basic-template-typescript

### Install
Open your terminal and type the command `npm install` to install all dependences.

### Start 
To start just type in the terminal `npm start`.

### Build 
Type in the terminal `npm run build`, you will note that the build file has been generated in dist folder.



### Questions & Results

Please answer the following questions.
####1) It was requested that MathA support the multiplication
operation but class MathB must remain untouched. Also, there
are plans to create the class MathC in the future and like MathA
it will use sum and multiplication functionalities. Following the
best object-oriented practices how do you solve that?

#####Code

```code
interface MyMathLib{
	sum(numberA: number, numberB:number): number;
}

class MathA implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}

class MathB implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}

```

#####Result

```code
interface MyMathLib{
	sum(numberA: number, numberB:number): number;
	mult(numberA: number, numberB:number)?: number;
}

class MathA implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
	mult(numberA: number, numberB:number): number {
	return numberA * numberB;
	}
}

class MathB implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}

class MathC implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}


```
#####or
```code
interface MyMathLib{
	sum(numberA: number, numberB:number): number;
}

class MathA implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}

class MathB implements MyMathLib{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
}


class MathC implements MathA{
	sum(numberA: number, numberB:number): number {
	return numberA + numberB;
	}
    mult(numberA: number, numberB:number): number {
	return numberA * numberB;
	}
}

```

#### 2) 
#####In the image below which method do you think is more readable and why?

#####Result
first method
the method shorter and used common, special syntactic // true ? 1 : 0;

#### 3)
#####Using PixiJS is possible to emit certain events from components
#####such as a Container. In the example below we are adding a listener
#####for a certain container event. Considering that we want to have a
#####fool-proof code, how we can improve the function below?
```example code

    addControlsListeners():void{
        this.controls.on('SomethingHappend', this.myCallBack.bind(this));
    }
```

######Result
```result code
    myCallBack (event) => {

    };

    addControlsListeners():void{
        this.controls.on('SomethingHappend', this.myCallBack);
    }
```


### **Task**

Using PixiJS, Typescript, Webpack and NPM. Build the task below.
1. Create a single reel in the middle of the screen with 3 visible
symbols. You can use the same symbol.
2. Add a button to perform a “round”. When clicked the button
will activate the reel spinning. The reel should keep the
spinning for 3 seconds before it stops.
3. When the reel stops spinning show some nice effect using
particles.
4. Display the FPS in top left of the screen.
5. Provide de sources in one of these methods (Bitbucket,
Github, Google Drive)
6. If possible, provide a link with working version

| [ ]  | 
| ------------ | ------------ |
| [ ]  | 
| [ ]  | 

- Assets will note be considered
-  It should be Fullscreen
-  It will be tested in low/mid devices
-  If you have a project template be free to use it or you can use this basic Template

