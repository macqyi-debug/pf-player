#!/usr/bin/env python3
import re

def clean_css_file(css_file):
    """清理CSS文件的格式"""
    
    # 读取CSS文件
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 移除每行开头的多余空白
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # 移除行首的空白（但保留相对缩进）
        cleaned_line = line.strip()
        if cleaned_line:
            cleaned_lines.append(cleaned_line)
    
    # 合并行
    cleaned_content = '\n'.join(cleaned_lines)
    
    # 写回文件
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"✅ 成功清理CSS文件格式: {css_file}")
    print(f"   文件大小: {len(cleaned_content)} 字符")

if __name__ == '__main__':
    css_file = '/Users/mac/Desktop/PF定制版player/styles/main.css'
    clean_css_file(css_file)
