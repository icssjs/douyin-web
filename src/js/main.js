import React from "react";
import reactDom from "react-dom";
import { Button, Input } from "antd"

reactDom.render(
    <div>
        <Button>提交</Button>
        <Input />
    </div>,
    document.getElementById('app')
)