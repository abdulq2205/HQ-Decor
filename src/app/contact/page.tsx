import { Mail, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-12">
            <h1 className="font-serif text-4xl">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gray-50 rounded-full"><Mail size={24} /></div>
                    <h3 className="font-serif text-lg">Email</h3>
                    <p className="text-sm text-gray-500">hello@hqdecor.com</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gray-50 rounded-full"><Instagram size={24} /></div>
                    <h3 className="font-serif text-lg">Instagram</h3>
                    <p className="text-sm text-gray-500">@hqdecor</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gray-50 rounded-full"><MapPin size={24} /></div>
                    <h3 className="font-serif text-lg">Location</h3>
                    <p className="text-sm text-gray-500">Coppell, Texas</p>
                </div>
            </div>
        </div>
    );
}
