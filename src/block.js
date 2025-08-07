// Gutenberg Block for Christine Valmy Chat
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('christine-valmy/chat-interface', {
    title: 'Christine Valmy Chat',
    icon: 'format-chat',
    category: 'widgets',
    description: 'Interactive chat interface for Christine Valmy beauty school',
    
    edit: function() {
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps}>
                <div style={{ 
                    padding: '20px', 
                    border: '2px dashed #ccc', 
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Christine Valmy Chat Interface</h3>
                    <p>This will display the interactive chat interface on the frontend.</p>
                    <small>Preview not available in editor - view on frontend to see full interface.</small>
                </div>
            </div>
        );
    },
    
    save: function() {
        return (
            <div className="christine-valmy-chat-block">
                [christine_valmy_test]
            </div>
        );
    }
});
