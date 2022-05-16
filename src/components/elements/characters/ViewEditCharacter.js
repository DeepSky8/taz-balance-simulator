import { history } from "../../../routers/AppRouter";

const ViewEditCharacter = ({ characterID }) => {

    const params = { id: history.location.pathname.split("/")[2] };
    return (
        <div>
            View Edit Character - 
            {params.id}
        </div>)
}

export default ViewEditCharacter

