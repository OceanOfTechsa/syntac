import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";

interface IRelatedBlogsProps {
    blogName: string
}

const RelatedBlogs = ({blogName}: IRelatedBlogsProps) => {
    return (
        <section className={'py-8 sm:space-y-16 sm:py-16 lg:py-24'}>
            <SectionHeader
                preTitle="Related blogs"
                title={`More about ${blogName}`}
                markedWord={blogName}
                desc={`Explore more insights, ideas, and perspectives related to ${blogName}.`}
            />
        </section>
    )
}
export default RelatedBlogs
