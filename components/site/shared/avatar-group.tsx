import { AvatarsGroupClient } from "@/components/site/shared/avatar-group-client";

export interface IAvatarData {
    src: string;
    fallback: string;
    name: string;
}

interface IAvatarsGroupProps {
    className?: string;
    avatars: IAvatarData[];
    limit?: number;
}

const AvatarsGroup = ({ className, avatars, limit }: IAvatarsGroupProps) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const skeletonCount = limit ? Math.max(0, limit - displayedAvatars.length) : 0;

    return (
        <AvatarsGroupClient
            className={className}
            avatars={displayedAvatars}
            skeletonCount={skeletonCount}
        />
    );
};

export default AvatarsGroup;