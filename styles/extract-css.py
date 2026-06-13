#!/usr/bin/env python3
import re
import sys

def extract_css_from_html(html_file, css_file):
    """从HTML文件中提取所有CSS样式到独立文件"""
    
    # 读取HTML文件
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 添加文件头
    header = """/*
 * PF-Player v4.1.5 主样式文件
 * 复古磁带风格音乐播放器
 * 最后更新: 2026-06-06
 * 自动生成 - 请勿手动修改
 */

"""
    
    # 提取所有<style>标签中的内容
    style_pattern = r'<style[^>]*>(.*?)</style>'
    styles = re.findall(style_pattern, content, re.DOTALL)
    
    # 合并所有样式
    combined_css = header
    for style in styles:
        # 清理缩进和空白
        cleaned_style = style.strip()
        if cleaned_style:
            combined_css += cleaned_style + '\n\n'
    
    # 写入CSS文件
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(combined_css)
    
    print(f"✅ 成功提取CSS到: {css_file}")
    print(f"   共提取 {len(styles)} 个style标签")
    print(f"   CSS文件大小: {len(combined_css)} 字符")

if __name__ == '__main__':
    html_file = '/Users/mac/Desktop/PF定制版player/index.html'
    css_file = '/Users/mac/Desktop/PF定制版player/styles/main.css'
    extract_css_from_html(html_file, css_file)
