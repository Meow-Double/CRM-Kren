import { useParams } from "react-router-dom";

export const EditPage: React.FC<{}> = () => {
    const params = useParams();
    return (
        <div>
            <h1 className="title">{`Редактирование ${params.company}`}</h1>
        </div>
    )
};