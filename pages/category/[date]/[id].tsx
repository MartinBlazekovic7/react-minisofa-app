import {GetServerSideProps} from "next";
import fetcher from "../../../util/fetch";
import {API_BASENAME} from "../../../util/ApiName";
import {EventInfo} from "../../../model/Event";
import OneCategory from "../../../modules/OneCategory";


interface CategoryPageInterface {
    details: EventInfo;
}

export default function CategoryPage(props: CategoryPageInterface) {

    const {details} = props
    console.log(details);
    return <><OneCategory events={details.events}/></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, res } = context;

    try {
        //@ts-ignore
        const { id, date } = params;

        const details = await fetcher(API_BASENAME + `category/${id}/scheduled-events/${date}`);

        const props: CategoryPageInterface = {details: details || []}
        return {
            props: props,
        };

    } catch (error) {
        res.statusCode = 404;
        return { props: { error } };
    }
};