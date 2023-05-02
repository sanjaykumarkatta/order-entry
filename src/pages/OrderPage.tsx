import ContainerLayout from "../components/containerLayout/ContainerLayout"
import OrderBlotter from "../components/orderBlotter/OrderBlotter";
import OrderEntry from "../components/orderEntry/OrderEntry";

const OrderPage = () => {

    return <>
        <ContainerLayout>
            <OrderEntry />
            <OrderBlotter />
        </ContainerLayout>
    </>
}

export default OrderPage;