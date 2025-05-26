import SidebarWrapper from '@/components/ui/shared/sidebar/SidebarWrapper';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<object>;

const layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default layout;
