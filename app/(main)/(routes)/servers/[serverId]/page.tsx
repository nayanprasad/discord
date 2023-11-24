import React from 'react';
import {useRouter, useParams} from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverId: string,
    }
}

const ServerIdPage = ({params}: ServerIdPageProps) => {
    return (
        <div>
            {params.serverId}
        </div>
    );
};

export default ServerIdPage;
