import Button from '@components/Button/Button';
import { FiArrowRight } from 'react-icons/fi';
import {} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

const IndexPage = () => {
    const [session, loading] = useSession();

    const href = session ? '/home' : '/login';
    return (
        <main className="relative h-screen overflow-x-hidden bg-primary">
            <div className="relative flex flex-col h-full overflow-hidden">
                <header className="z-10 flex items-baseline justify-between px-3 py-5 sm:px-7 lg:px-14">
                    <h2 className="text-2xl font-bold tracking-tighter text-white ">Dumpr</h2>

                    {!loading && (
                        <Link href={href}>
                            <a href="login" className="text-base font-medium text-white bg-transparent hover:underline">
                                {session ? 'Enter App' : 'Log in'}
                            </a>
                        </Link>
                    )}
                </header>

                <div className="grid items-center flex-1 px-2 pt-28 justify-items-center lg:justify-items-start lg:grid-cols-2 md:pl-14 lg:pt-0">
                    <div className="z-10 flex flex-col items-center justify-center w-full mt-16 space-y-5 text-center lg:justify-start lg:mt-0 lg:text-left lg:items-start lg:space-y-10 md:max-w-xl">
                        <h1 className="text-[2rem] sm:leading-snug font-semibold max-w-[18ch] text-white sm:text-5xl">
                            Keep Your Bookmarks All In One Place.
                        </h1>
                        <Link href={href}>
                            <Button
                                isSecondary
                                className="py-3 text-base font-medium transition duration-300 bg-white rounded px-7 text group hover:bg-primary-dark hover:text-white"
                            >
                                Get Started <FiArrowRight className="ml-3 group-hover:animate-bounce" />
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <svg
                            width="742"
                            height="703"
                            viewBox="0 0 742 703"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute bottom-0 left-0 z-0 h-auto max-w-full transform rotate-180 translate-y-28 lg:rotate-0 lg:left-auto lg:bottom-auto lg:translate-y-0 lg:right-0 lg:top-0 lg:bottom"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M741.839 607.898C741.839 626.691 745.016 655.615 723.133 669.438C648.037 716.877 554.298 667.887 473.289 655.607C447.608 651.715 422.035 647.838 396.828 645.892C357.26 642.836 314.94 658.946 273.227 674.825C220.308 694.97 168.364 714.743 124.249 694.541C45.8317 658.63 13.3749 557.577 1.2943 464.759C-4.95081 416.776 12.5 367.801 30.1452 318.281C43.6038 280.511 57.1755 242.423 60.432 204.216C63.6478 166.485 53.6298 128.859 43.787 91.891C32.7692 50.51 21.971 9.95404 30.2007 -29L741.839 -29V607.898Z"
                                fill="#6D49F1"
                            />
                        </svg>
                        <div className="transform scale-125 translate-y-28 md:scale-150 md:translate-y-56 lg:scale-150 lg:translate-y-0 translate-x-1/3 xl:scale-125 xl:translate-x-1/4 2xl:translate-x-0 ">
                            <Image
                                src="/sample.png"
                                alt="sample of app"
                                width={1920}
                                height={1080}
                                quality={100}
                                priority
                                className="rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default IndexPage;
