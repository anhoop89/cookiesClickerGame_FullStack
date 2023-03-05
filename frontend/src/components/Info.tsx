import { useState } from 'react';

function Info() {
    const [value, setValue] = useState<number>();
    const [origin, setOrigin] = useState<string>();
    const isDisabled = (base: string) => (origin !== undefined && origin !== base);

    const updateValue = (baseName: string, base: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // @ts-ignore

        }

    return <div className="mt-20 mb-10">
        <h1> This text displays from Info.tsx</h1>
    </div>
}

export default Info;

