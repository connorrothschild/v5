import Image from 'next/image';
import { MDXComponents } from 'mdx/types';

export const components: MDXComponents = {
  Image: (props: any) => (
    <div className="relative my-8">
      <Image {...props} />
    </div>
  ),
  video: (props: any) => (
    <video className="w-full" {...props} />
  ),
  // Add any other custom components here
};
