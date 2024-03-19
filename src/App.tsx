import React from "react";

enum ParamType {
    String = 'text'
}

type Color = string

interface Param {
    id: number;
    name: string;
    type: ParamType;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    model: Model
    color: Color
    params: Param[]
}

class ParamEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            model: props.model,
            color: "",
            params: props.params
        }
        console.log(this.state)
    }

    public getModel(): Model {
        return this.state.model
    }

    public setModelValue = (value: string, id: number) => {
        this.setState(prevState => ({
            ...prevState,
            model: {
                ...prevState.model,
                paramValues: prevState.model.paramValues.map(elem => {
                    if (elem.paramId == id) {
                        return {...elem, value}
                    }
                    return elem
                })
            }
        }))
    }


    render() {
        const {model, params} = this.state

        return (
            <>
                <button onClick={() => console.log(this.getModel())}>Модель</button>
                <div className={`list`}>
                    {model?.paramValues?.map(elem => {
                        const param = params.find(para => para.id == elem.paramId)
                        return (
                            <div key={elem.paramId}>
                                {param?.name}
                                <input
                                    type={param?.type}
                                    value={elem.value}
                                    onChange={(e) => this.setModelValue(e.target.value, elem.paramId)}
                                />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

const params: Param[] = [
    {id: 1, name: 'Назначение', type: ParamType.String},
    {id: 2, name: 'Длина', type: ParamType.String},
]

const model: Model = {
    paramValues: [
        {paramId: 1, value: 'Повседневное'},
        {paramId: 2, value: 'Макси'},
    ],
    colors: ["red"],
}

const App: React.FC = () => {
    return (
        <main className={`container`}>
            <ParamEditor params={params} model={model}/>
        </main>
    )
}

export default App
