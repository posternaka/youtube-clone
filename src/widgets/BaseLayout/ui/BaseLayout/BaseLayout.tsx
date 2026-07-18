import { Header } from "../Header/Header";
import { LeftMenu } from "../LeftMenu/LeftMenu";

import s from "./BaseLayout.module.css";

type BaseLayoutProps = Readonly<{ children: React.ReactNode }>

export const BaseLayout = ( {children}: BaseLayoutProps ) => {
    return (
        <div className={s.container}>
            <Header />
            <LeftMenu />
            { children }
        </div>
    )
}