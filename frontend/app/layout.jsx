import '@styles/Global.css';
import { Poppins } from 'next/font/google';
import Provider from '@components/Provider';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '400']
});


const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className={poppins.className} suppressHydrationWarning={true}>
                <Provider>
                    {children}
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName="toastContainer"
                        toastOptions={{
                            // Define default options
                            className: "message",
                            duration: 3000,
                            style: {
                                background: '#efefef',
                                color: '#2E3440',
                            },
                        }}
                    />
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;