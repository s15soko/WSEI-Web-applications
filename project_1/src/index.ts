class Project
{
    buttons: NodeListOf<HTMLInputElement> | undefined;
    inputsData: number[] = [];

    constructor()
    {
        this.init();
    }

    init()
    {
        this.assignData();
        this.assignEvents();
    }

    assignData()
    {
        this.buttons = document.getElementById("inputs-container")?.querySelectorAll("input");

    }

    assignEvents()
    {
        if(this.buttons != undefined) {
            this.buttons.forEach((button: HTMLInputElement) => {
                button.addEventListener("input", (e: any) => {
                    this.updateInputsData();
                    this.countInputsData();
                    this.updateData();
                });
            });
        }
    }

    countInputsData()
    {
        console.log(this.countMin());
        
    }

    updateInputsData()
    {
        let inputsData: number[] = [];

        if(this.buttons != undefined) {
            this.buttons.forEach((button: HTMLInputElement) => {
                if(this.isNumber(button.value))
                    inputsData.push(Number(button.value));
            });
        }

        this.inputsData = inputsData;
    }

    countMin()
    {
        return Math.min.apply(Math, this.inputsData);
    }

    countMax()
    {
        return Math.max.apply(Math, this.inputsData);
    }

    countAvg()
    {
        return this.countSum() / this.inputsData.length;
    }

    countSum()
    {
        let sum = 0;
        this.inputsData.forEach(val => {
            sum += val;
        });

        return sum;
    }

    updateData()
    {
        console.log(this.countMin());
        console.log(this.countMax());
        console.log(this.countAvg());
        console.log(this.countSum());
    }

    isNumber(value: string | number): boolean
    {
        return ((value != null) &&(value !== '') && !isNaN(Number(value.toString())));
    }
}

let project = new Project();