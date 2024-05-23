import { CalendarDaysIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { posts } from '../../../test/posts';

export default function NewDetail() {
    const navigate = useNavigate();
    return (
        <div className="mx-8 pb-7 pt-10 md:pt-24">
            <button
                onClick={() => navigate(-1)}
                className="group mb-4 flex items-center pl-0 text-white"
            >
                <ChevronLeftIcon className="h-7 w-7 transition duration-500 ease-out group-hover:text-magenta-500" />
                <span className="text-lg transition duration-500 ease-out group-hover:text-magenta-500">
                    Back
                </span>
            </button>
            <div className="bg-white dark:bg-zinc-900/70">
                <div className="relative h-full w-full overflow-hidden max-sm:aspect-h-6 max-sm:aspect-w-16">
                    <img
                        src="https://www.fjallraven.com/4ae12e/globalassets/fjallraven/eu/sustainability-update/desktop-hero.png?width=1920&mode=Min&bgcolor=fff&quality=100"
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex flex-col space-y-2 p-2 md:p-5">
                    <div className="flex h-full w-full justify-start text-wrap text-lg font-extrabold tracking-wide text-white  md:text-3xl lg:text-4xl">
                        POST TITLE IS ABOUT TO BE HERE
                    </div>
                    <div className="flex items-center space-x-7 px-1 max-sm:justify-between">
                        <div className="relative mt-1 flex items-center gap-x-4">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                }
                                alt=""
                                className="h-10 w-10 rounded-full bg-gray-50"
                            />
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-gray-900 dark:text-stone-100">
                                    <Link to={'#'}>
                                        <span className="absolute inset-0" />
                                        Michael Jackson
                                    </Link>
                                </p>
                                <p className="text-gray-600 dark:text-stone-300">
                                    Admin
                                </p>
                            </div>
                        </div>
                        <div className="flex text-sm leading-6">
                            <CalendarDaysIcon className="h-6 w-6 text-gray-900 dark:text-zinc-300" />
                            <p className="text-gray-900 dark:text-zinc-300">
                                12/12/2023
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-2 text-justify leading-7 tracking-wide text-zinc-200 md:p-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente quasi, dicta unde nostrum sunt id, accusamus,
                    assumenda at harum voluptatibus provident neque aut
                    inventore earum corrupti. Assumenda amet aperiam quam minus
                    corrupti autem quisquam velit id! Odit vel illum harum
                    aspernatur recusandae, aut dolores maxime nisi autem placeat
                    molestiae rerum porro quasi est necessitatibus dicta
                    architecto vero veniam quidem unde adipisci reiciendis
                    tempora tempore fugit? Quasi quas quia, porro tenetur amet
                    veritatis quam repellat illo obcaecati dignissimos iusto
                    natus vitae commodi tempora reiciendis hic architecto aut
                    aperiam. Quo, odit. Maxime, deserunt laborum cupiditate
                    ratione doloribus dolores maiores neque perferendis nisi
                    reprehenderit. In voluptate quisquam perspiciatis at, est
                    officiis suscipit necessitatibus fuga voluptates hic officia
                    labore iste repellendus ipsam corrupti qui vel eligendi
                    reiciendis aliquid molestiae inventore libero dolore?
                    Corporis, voluptatibus accusamus labore vitae omnis beatae
                    totam temporibus quidem consequatur officia ullam et
                    dolorem, eum magnam quibusdam dolorum architecto id
                    quisquam? Debitis neque sed, dolorum accusantium laudantium
                    omnis sapiente maiores, facilis esse asperiores doloremque!
                    Maiores consequuntur eum saepe, voluptates laudantium
                    voluptate nihil repudiandae laboriosam error quasi! Ipsa
                    officia, corrupti commodi, aspernatur soluta distinctio
                    molestias obcaecati labore, ad ea dolorum ducimus! Nobis,
                    repellat. Rerum iusto facilis ea, doloremque voluptatum sed
                    numquam mollitia cum ipsum et eveniet magnam! Quidem placeat
                    voluptatem velit facilis assumenda quas unde cumque
                    accusantium! Quidem cum deleniti nostrum fugiat cupiditate
                    aperiam odit voluptates eum at libero adipisci dolor
                    consequuntur, perspiciatis quasi unde quaerat non maiores
                    laborum nulla! Necessitatibus id a dicta magnam neque
                    officiis eos harum provident laudantium esse aspernatur vel,
                    aut ullam aperiam mollitia officia delectus qui deleniti
                    veritatis quas beatae laborum, culpa aliquam sed. Commodi
                    debitis veritatis corporis, illo tempora, pariatur
                    voluptatum doloremque quaerat neque rem, aspernatur qui
                    dolorum at eveniet accusantium. Similique et tempore,
                    sapiente ratione quam, ex tempora voluptate voluptates
                    repellat, voluptatibus eveniet fugiat at blanditiis
                    provident corporis pariatur assumenda possimus ullam
                    molestias? Magnam hic sint ea, recusandae dolorem aperiam
                    maiores esse est maxime vel quo, sapiente sit eos quos!
                    Debitis, velit. Cum dolorum pariatur laudantium laboriosam
                    doloribus beatae vitae odio eaque sed. Numquam aspernatur
                    quae repellendus pariatur repudiandae cumque minima
                    dignissimos inventore voluptates facilis saepe, reiciendis
                    expedita suscipit, voluptas maiores ratione tenetur adipisci
                    autem repellat. Eos, animi ullam. Aliquam exercitationem
                    deleniti, natus totam amet ea ad harum quasi id accusamus
                    nulla commodi a quisquam ducimus sed nihil iusto quia
                    similique dolore animi. Autem praesentium mollitia iusto
                    tenetur vel aliquid, sequi vero labore perferendis! Est
                    voluptatum itaque eaque laborum maxime explicabo quis
                    aliquid qui dicta laboriosam tempore quae repellat quos
                    alias facilis mollitia sit architecto fugit, incidunt odio
                    ducimus molestias. Alias aperiam ducimus possimus similique
                    necessitatibus recusandae unde praesentium consequatur non
                    eum! Sapiente dolores animi ab fuga quaerat necessitatibus.
                    Praesentium fugit quam a maxime aspernatur quaerat ullam,
                    esse, eveniet assumenda impedit facilis velit tenetur
                    reprehenderit architecto nesciunt qui at aliquid, sit
                    nostrum eligendi odio labore quibusdam. Quae neque provident
                    vel voluptates doloremque nam ipsam placeat pariatur,
                    reiciendis, dolorum minima quos nulla eos nobis ut
                    architecto recusandae facere aperiam itaque eius esse illo!
                    Quidem, accusamus itaque?
                </div>
            </div>
            <div className="pt-7">
                <span className="text-2xl font-bold text-white lg:text-3xl">
                    OTHER POSTS YOU MAY BE INTERESTED IN
                </span>
                <div className="mt-3 grid gap-x-4 gap-y-4 text-white md:grid-cols-3">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className={`all-ease group relative flex w-full flex-col justify-between overflow-hidden rounded-md p-3 shadow-md transition duration-200`}
                        >
                            <img
                                src={post.image}
                                className="absolute left-0 top-0 max-h-screen max-w-full object-cover object-center brightness-75 transition duration-500 ease-out group-hover:brightness-50 max-sm:scale-125"
                            />
                            <div className="z-10 flex items-center gap-x-4 text-xs">
                                <time
                                    dateTime={post.datetime}
                                    className="text-gray-500 dark:text-stone-300"
                                >
                                    {post.date}
                                </time>
                            </div>
                            <div className="group relative mt-24 transition duration-500 ease-out">
                                <h3 className="mt-3 text-xl font-semibold leading-6 text-white transition duration-200 ease-out">
                                    <Link to={'/new/d/1'}>
                                        <span className="absolute inset-0 " />
                                        {post.title}
                                    </Link>
                                </h3>
                            </div>
                            <div className="relative mt-1 flex items-center gap-x-4">
                                <img
                                    src={post.author.imageUrl}
                                    alt=""
                                    className="h-10 w-10 rounded-full bg-gray-50"
                                />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900 dark:text-stone-100">
                                        <Link to={post.author.to}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </Link>
                                    </p>
                                    <p className="text-gray-600 dark:text-stone-300">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
