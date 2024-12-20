import { EnvelopeIcon, HomeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import { useDispatch } from 'react-redux';
import { newContact } from '../../../store/actions/contact-actions';

export default function Contact() {
    const dispatch = useDispatch();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line no-unused-vars
    const editorRef = useRef(null);
    const [emailContent, setEmailContent] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');

    // eslint-disable-next-line no-unused-vars
    const handleSendMail = (e) => {
        e.preventDefault();

        const signal = toast.loading('Vui lòng chờ...');

        // Your EmailJS service ID, template ID, and Public Key
        const serviceId = 'service_xr0116g';
        const templateId = 'template_k9k9xrg';
        const publicKey = '9qI8f2qVbpx4hzXde';

        // Create a new object that contains dynamic template params
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'OutRunner',
            message: emailContent,
            title: title,
        };
        try {
            emailjs
                .send(serviceId, templateId, templateParams, publicKey)
                .then(async () => {
                    const result = await dispatch(
                        newContact({
                            customer_email: email,
                            contact_title: title,
                            customer_name: name,
                            contact_content: emailContent,
                        })
                    );
                    setName('');
                    setEmail('');
                    setEmailContent('');
                    setTitle('');
                    if (result) {
                        toast.update(signal, {
                            render: 'Gửi liên hệ thành công',
                            type: 'success',
                            isLoading: false,
                            closeOnClick: true,
                            autoClose: 3000,
                        });
                    }
                });
        } catch (error) {
            toast.update(signal, {
                render: 'Đã có lỗi xảy ra: ' + error,
                type: 'error',
                isLoading: false,
                closeOnClick: true,
                autoClose: 3000,
            });
        }
        // Send the email using EmailJS
    };

    const editorChange = (content) => {
        setEmailContent(content);
    };

    return (
        <div className="flex justify-center pb-16 pt-10 md:pt-24">
            <DocumentTitle title="Liên hệ" />

            <div className="w-9/12 md:w-10/12">
                <h1 className="pl-9 text-3xl font-bold tracking-wide text-gray-900 md:pl-14 md:text-4xl dark:text-white">
                    LIÊN HỆ VỚI CHÚNG TÔI
                </h1>
                <div className="mt-7 grid gap-5 rounded-md bg-white p-4 shadow-md md:grid-cols-3 dark:bg-zinc-900 dark:shadow-inner dark:shadow-white/25">
                    <div className="grid h-fit gap-5 p-4">
                        <div className="flex flex-col text-gray-900 dark:text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <PhoneIcon className="h-6 w-6" />
                                <span>Số điện thoại</span>
                            </div>
                            <div className="text-xl">+123-123-213-213</div>
                        </div>
                        <div className="flex flex-col text-gray-900 dark:text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <HomeIcon className="h-6 w-6" />
                                <span>Địa chỉ</span>
                            </div>
                            <div className="text-justify text-xl">
                                20 Tang Nhon Phu B Street, Phuoc Long B Ward,
                                Thu Duc City, HCM City
                            </div>
                        </div>
                        <div className="flex flex-col text-gray-900 dark:text-white">
                            <div className="flex items-center space-x-2 text-lg">
                                <EnvelopeIcon className="h-6 w-6" />
                                <span>Email</span>
                            </div>
                            <div className="text-xl">abcdef@gmail.com</div>
                        </div>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.987103826621!2d106.774999!3d10.8306805!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1712302739152!5m2!1svi!2s"
                                className="h-72 w-full border-0"
                                frameBorder="0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                    <form
                        method="post"
                        onSubmit={handleSendMail}
                        className="flex flex-col space-y-5 p-4 md:col-span-2"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col -space-y-1 text-gray-900 dark:text-white">
                                <span className="text-sm">Họ tên đầy đủ*</span>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white"
                                />
                            </div>
                            <div className="flex flex-col -space-y-1 text-gray-900 dark:text-white">
                                <span className="text-sm">Email*</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col -space-y-1 text-gray-900 dark:text-white">
                            <span className="text-sm">Tiêu đề*</span>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 transition duration-500 ease-out placeholder:text-zinc-400 focus:border-magenta-500 focus:placeholder-transparent focus:ring-0 dark:border-white"
                            />
                        </div>
                        <div className="flex flex-col space-y-1 text-gray-900 dark:text-white">
                            <span className="text-sm">Chi tiết liên hệ*</span>
                            <Editor
                                apiKey="b6ic198ke2qcqbou4w6gx76a7tz5fx69qmclac76acprbgt4"
                                value={emailContent}
                                init={{
                                    plugins:
                                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                    toolbar:
                                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        {
                                            value: 'First.Name',
                                            title: 'First Name',
                                        },
                                        { value: 'Email', title: 'Email' },
                                    ],

                                    skin: 'material-outline',
                                    icons: 'material',
                                    language: 'vi',
                                }}
                                onEditorChange={editorChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md border-2 border-magenta-500 bg-magenta-500 px-8 py-2 font-bold text-white shadow-md transition duration-500 ease-out hover:-translate-y-1 dark:text-white"
                            >
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
