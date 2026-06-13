#!/usr/bin/env python3
import re

def remove_style_tags(html_file):
    """从HTML文件中删除所有<style>标签"""
    
    # 读取HTML文件
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 删除所有<style>标签及其内容
    cleaned_content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL)
    
    # 清理多余的空行
    cleaned_content = re.sub(r'\n\s*\n\s*\n', '\n\n', cleaned_content)
    
    # 写回文件
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"✅ 成功删除所有style标签: {html_file}")

if __name__ == '__main__':
    html_file = '/Users/mac/Desktop/PF定制版player/index.html'
    remove_style_tags(html_file)
