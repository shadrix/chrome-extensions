import {ReactElement, FC, useState, useEffect, useContext} from "react";
import {Button, Container} from '@mui/material'
import { AppStoreContext } from "../../components/App/App";


const Home: FC<any> = (): ReactElement => {
    const appStore = useContext(AppStoreContext);
    const parentWindow = appStore.parentWindow;
    
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        parentWindow.onMessage((message) => {

        switch (message.type) {
            case "CRYPTO_BUTTON_CLICKED":
            setMessage(message.content.message);
            break;
        }
        });
    }, [parentWindow]);

    return (
        <Container>
            <Button variant="contained" onClick={() => {
                    parentWindow.sendMessage({
                        type: "SCAN_DOM",
                        content: {
                        message: "Hello, parent!",
                        },
                    });
                    }} >Scan channel</Button>
                {message}
        </Container>
    );
};

export default Home;