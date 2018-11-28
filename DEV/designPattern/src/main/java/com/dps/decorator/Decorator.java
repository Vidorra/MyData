package com.dps.decorator;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

/**
 * 装饰类
 * @author dengchao
 * @date 2018/11/28 14:50
 */
public class Decorator implements Component {
    private Component component;

    @Autowired
    public Decorator(Component component) {
        this.component = component;
    }

    @Override
    public Map<String,String> show() {
        //为派给构建
        return component.show();
    }
}