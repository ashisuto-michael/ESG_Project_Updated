import React from "react";

import { Progress } from '@chakra-ui/react'

export default function Banner(props){
    const { ...rest } = props;
    return(<Progress
            // // variant='table'
            // // colorScheme='brandScheme'
            // // h='8px'
            // // w='108px'
            value={80}
      />);
}