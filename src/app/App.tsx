import { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar/ui/Navbar';

function App() {
    return (
        <div className="min-h-screen bg-cover">
            <Navbar />
            <Suspense fallback="">
                <div className="flex relative w-full">{<AppRouter />}</div>
            </Suspense>
        </div>
    );
}

export default App;
